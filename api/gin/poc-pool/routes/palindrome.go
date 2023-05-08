package routes

import (
	"SoftwareGoDay3/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

type PalindromeResponse struct {
	Input  string `json:"input"`
	Result bool   `json:"result"`
}

func isPalindrome(input string) bool {
	size := len(input)
	stop := size / 2
	for i := 0; i < stop; i++ {
		if input[i] != input[size-i-1] {
			return false
		}
	}
	return true
}

func areThesePalindromes(c *gin.Context) {
	var inputs []string
	_ = c.ShouldBindBodyWith(&inputs, binding.JSON)
	palindromes := make([]PalindromeResponse, len(inputs))
	for idx, input := range inputs {
		palindromes[idx] = PalindromeResponse{Input: input, Result: isPalindrome(input)}
	}
	c.JSON(http.StatusOK, palindromes)
}

func applyPalindrome(r *gin.Engine) {
	r.POST("/are-these-palindromes", middlewares.CheckPalindrome, areThesePalindromes)
}
