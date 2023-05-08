package tests

import (
	"SoftwareGoDay3/server"
	"fmt"
	"io"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHealth(t *testing.T) {
	url := fmt.Sprintf("http://%s:%s/health", server.Config.Host, server.Config.Port)
	resp, err := http.Get(url)
	assert.Nil(t, err, "Request failed")

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	assert.Nil(t, err, "Failed to read the body")

	assert.Equal(t, http.StatusOK, resp.StatusCode, "Wrong status code")
	assert.Equal(t, "", string(body), "Wrong body result")
}
