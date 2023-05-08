package tests

import (
	"SoftwareGoDay3/server"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRepeatQuery(t *testing.T) {
	tests := []struct {
		query          string
		expectedStatus int
		expectedBody   string
	}{
		{"?message=SoftwarePoolPoC2023", http.StatusOK, "SoftwarePoolPoC2023"},
		{"?random=SoftwarePoolPoC2023", http.StatusBadRequest, ""},
		{"", http.StatusBadRequest, ""},
	}

	for _, test := range tests {
		url := fmt.Sprintf("http://%s:%s/repeat-my-query/%s", server.Config.Host, server.Config.Port, test.query)
		resp, err := http.Get(url)
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")
		assert.Equal(t, test.expectedBody, string(body), "Wrong body result")
	}
}

func TestRepeatParam(t *testing.T) {
	tests := []struct {
		query          string
		expectedStatus int
		expectedBody   string
	}{
		{"SoftwarePoolPoC2023", http.StatusOK, "SoftwarePoolPoC2023"},
		{"", http.StatusNotFound, "404 page not found"},
	}

	for _, test := range tests {
		url := fmt.Sprintf("http://%s:%s/repeat-my-param/%s", server.Config.Host, server.Config.Port, test.query)
		resp, err := http.Get(url)
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")
		assert.Equal(t, test.expectedBody, string(body), "Wrong body result")
	}
}

func TestRepeatBody(t *testing.T) {
	tests := []struct {
		body           string
		expectedStatus int
		expectedBody   string
	}{
		{"SoftwarePoolPoC2023", http.StatusOK, "SoftwarePoolPoC2023"},
		{"", http.StatusBadRequest, ""},
	}

	for _, test := range tests {
		reqBody, _ := json.Marshal(test.body)

		url := fmt.Sprintf("http://%s:%s/repeat-my-body", server.Config.Host, server.Config.Port)
		resp, err := http.Post(url, "application/json", bytes.NewBuffer(reqBody))
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")
		assert.Equal(t, test.expectedBody, string(body), "Wrong body result")
	}
}

func TestRepeatHeader(t *testing.T) {
	tests := []struct {
		key            string
		value          string
		expectedStatus int
		expectedBody   string
	}{
		{"X-Message", "SoftwarePoolPoC2023", http.StatusOK, "SoftwarePoolPoC2023"},
		{"message", "SoftwarePoolPoC2023", http.StatusBadRequest, ""},
	}

	for _, test := range tests {
		url := fmt.Sprintf("http://%s:%s/repeat-my-header", server.Config.Host, server.Config.Port)
		req, err := http.NewRequest("GET", url, nil)
		assert.Nil(t, err, "Request failed")

		req.Header.Set(test.key, test.value)
		client := &http.Client{}
		resp, err := client.Do(req)
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")
		assert.Equal(t, test.expectedBody, string(body), "Wrong body result")
	}

}

func TestRepeatCookie(t *testing.T) {
	tests := []struct {
		cookie         http.Cookie
		expectedStatus int
		expectedBody   string
	}{
		{http.Cookie{Name: "message", Value: "SoftwarePoolPoC2023"}, http.StatusOK, "SoftwarePoolPoC2023"},
		{http.Cookie{Name: "random", Value: "SoftwarePoolPoC2023"}, http.StatusBadRequest, ""},
		{http.Cookie{}, http.StatusBadRequest, ""},
	}

	for _, test := range tests {
		url := fmt.Sprintf("http://%s:%s/repeat-my-cookie", server.Config.Host, server.Config.Port)
		req, err := http.NewRequest("GET", url, nil)
		assert.Nil(t, err, "Request failed")

		req.AddCookie(&test.cookie)
		client := &http.Client{}
		resp, err := client.Do(req)
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")
		assert.Equal(t, test.expectedBody, string(body), "Wrong body result")
	}

}

func TestRepeatQueries(t *testing.T) {
	type Response struct {
		Key   string `json:"key"`
		Value string `json:"value"`
	}
	tests := []struct {
		query          string
		expectedStatus int
		expectedBody   []Response
	}{
		{"?message=SoftwarePoolPoC2023", http.StatusOK, []Response{{Key: "message", Value: "SoftwarePoolPoC2023"}}},
		{"?a=b&c=d&e=f", http.StatusOK, []Response{{Key: "a", Value: "b"}, {Key: "c", Value: "d"}, {Key: "e", Value: "f"}}},
		{"", http.StatusBadRequest, []Response(nil)},
	}

	for _, test := range tests {
		url := fmt.Sprintf("http://%s:%s/repeat-all-my-queries/%s", server.Config.Host, server.Config.Port, test.query)
		resp, err := http.Get(url)
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")
		var outputBody []Response
		json.Unmarshal(body, &outputBody)

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")
		assert.ElementsMatch(t, test.expectedBody, outputBody, "Wrong body result")
	}
}
