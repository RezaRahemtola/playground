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

func TestPalindrome(t *testing.T) {
	type Response struct {
		Input  string `json:"input"`
		Result bool   `json:"result"`
	}
	tests := []struct {
		body           []string
		expectedStatus int
		expectedBody   []Response
	}{
		{[]string{"kayak"}, http.StatusOK, []Response{{Input: "kayak", Result: true}}},
		{[]string{"PoC"}, http.StatusOK, []Response{{Input: "PoC", Result: false}}},
		{[]string{"Go", "level"}, http.StatusOK, []Response{{Input: "Go", Result: false}, {Input: "level", Result: true}}},
		{[]string{}, http.StatusOK, []Response{}},
	}

	for _, test := range tests {
		reqBody, _ := json.Marshal(test.body)

		url := fmt.Sprintf("http://%s:%s/are-these-palindromes", server.Config.Host, server.Config.Port)
		resp, err := http.Post(url, "application/json", bytes.NewBuffer(reqBody))
		assert.Nil(t, err, "Request failed")

		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		assert.Nil(t, err, "Failed to read the body")
		var outputBody []Response
		json.Unmarshal(body, &outputBody)

		assert.Equal(t, test.expectedStatus, resp.StatusCode, "Wrong status code")
		assert.Equal(t, test.expectedBody, outputBody, "Wrong body result")
	}
}
