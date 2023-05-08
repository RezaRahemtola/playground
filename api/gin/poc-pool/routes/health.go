package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func health(c *gin.Context) {
	c.Status(http.StatusOK)
}

func applyHealth(r *gin.Engine) {
	r.GET("/health", health)
}
