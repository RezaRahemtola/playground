package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

func CheckPalindrome(c *gin.Context) {
	var ins []string
	if err := c.ShouldBindBodyWith(&ins, binding.JSON); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	c.Next()
}
