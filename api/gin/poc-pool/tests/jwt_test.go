package tests

import (
	"SoftwareGoDay3/routes/jwt"
	"SoftwareGoDay3/server"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRegister(t *testing.T) {
	user := jwt.User{Email: "test-register@poc-innovation.fr", Password: "test"}
	tests := []struct {
		body           jwt.User
		expectedStatus int
		expectedBody   jwt.AuthResponse
	}{
		{user, http.StatusCreated, jwt.AuthResponse{User: user, Message: "User successfully created"}},
		{user, http.StatusForbidden, jwt.AuthResponse{Message: "User already exists"}},
	}

	for _, test := range tests {
		reqBody, _ := json.Marshal(test.body)

		url := fmt.Sprintf("http://%s:%s/jwt/register", server.Config.Host, server.Config.Port)
		resp, err := http.Post(url, "application/json", bytes.NewBuffer(reqBody))
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")

		switch test.expectedStatus {
		case http.StatusCreated:
			var outputBody jwt.AuthResponse
			json.Unmarshal(body, &outputBody)
			assert.Equal(t, test.expectedBody.User, outputBody.User, "Wrong body user result")
			assert.Equal(t, test.expectedBody.Message, outputBody.Message, "Wrong body message result")
		case http.StatusForbidden:
			assert.Equal(t, test.expectedBody.Message, string(body), "Wrong body result")
		}
	}
}

func TestLogin(t *testing.T) {
	users := []jwt.User{{Email: "test-login@poc-innovation.fr", Password: "test"}, {Email: "test-login@poc-innovation.fr", Password: "wrong"}, {Email: "unknown-login@mail.com", Password: "test"}}
	tests := []struct {
		toRegister     jwt.User
		toLogin        jwt.User
		expectedStatus int
		expectedBody   jwt.AuthResponse
	}{
		{users[0], users[0], http.StatusOK, jwt.AuthResponse{User: users[0], Message: "Successful login"}},
		{jwt.User{}, users[2], http.StatusNotFound, jwt.AuthResponse{Message: "User not found"}},
		{jwt.User{}, users[1], http.StatusNotFound, jwt.AuthResponse{Message: "Wrong password"}},
	}

	for _, test := range tests {
		if test.toRegister != (jwt.User{}) {
			toRegister, _ := json.Marshal(test.toRegister)
			url := fmt.Sprintf("http://%s:%s/jwt/register", server.Config.Host, server.Config.Port)
			_, err := http.Post(url, "application/json", bytes.NewBuffer(toRegister))
			assert.Nil(t, err, "Register request failed")
		}

		toLogin, _ := json.Marshal(test.toLogin)
		url := fmt.Sprintf("http://%s:%s/jwt/login", server.Config.Host, server.Config.Port)
		resp, err := http.Post(url, "application/json", bytes.NewBuffer(toLogin))
		assert.Nil(t, err, "Login request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")

		switch test.expectedStatus {
		case http.StatusOK:
			var outputBody jwt.AuthResponse
			json.Unmarshal(body, &outputBody)
			assert.Equal(t, test.expectedBody.User, outputBody.User, "Wrong body user result")
			assert.Equal(t, test.expectedBody.Message, outputBody.Message, "Wrong body message result")
		case http.StatusNotFound:
			assert.Equal(t, test.expectedBody.Message, string(body), "Wrong body result")
		}
	}
}

func TestMe(t *testing.T) {
	users := []jwt.User{{Email: "test-me@poc-innovation.fr", Password: "test"}, {Email: "unknown-me@mail.com", Password: "test"}}
	tests := []struct {
		toRegister     jwt.User
		token          string
		expectedStatus int
		expectedBody   jwt.AuthResponse
	}{
		{users[0], "", http.StatusOK, jwt.AuthResponse{User: users[0], Message: "User found"}},
		{jwt.User{}, "token.token.token", http.StatusUnauthorized, jwt.AuthResponse{Message: "Unauthorized"}},
	}

	for _, test := range tests {
		token := test.token
		if test.toRegister != (jwt.User{}) {
			toRegister, _ := json.Marshal(test.toRegister)
			url := fmt.Sprintf("http://%s:%s/jwt/register", server.Config.Host, server.Config.Port)
			resp, err := http.Post(url, "application/json", bytes.NewBuffer(toRegister))
			assert.Nil(t, err, "Register request failed")

			defer resp.Body.Close()
			body, err := io.ReadAll(resp.Body)
			assert.Nil(t, err, "Failed to read the register body")

			var registerBody jwt.AuthResponse
			json.Unmarshal(body, &registerBody)
			token = registerBody.AccessToken
		}

		url := fmt.Sprintf("http://%s:%s/jwt/me", server.Config.Host, server.Config.Port)
		req, err := http.NewRequest("GET", url, nil)
		assert.Nil(t, err, "Request failed")

		bearer := fmt.Sprintf("Bearer %s", token)
		req.Header.Set("Authorization", bearer)
		client := &http.Client{}
		resp, err := client.Do(req)
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")

		switch test.expectedStatus {
		case http.StatusOK:
			var outputBody jwt.AuthResponse
			json.Unmarshal(body, &outputBody)
			assert.Equal(t, test.expectedBody.User, outputBody.User, "Wrong body user result")
			assert.Equal(t, test.expectedBody.Message, outputBody.Message, "Wrong body message result")
		case http.StatusUnauthorized, http.StatusNotFound:
			assert.Equal(t, test.expectedBody.Message, string(body), "Wrong body result")
		}
	}
}
