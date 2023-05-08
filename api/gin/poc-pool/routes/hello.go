package routes

import (
	"SoftwareGoDay3/server"
	"net/http"

	"github.com/gin-gonic/gin"
)

func world(c *gin.Context) {
	c.String(http.StatusOK, server.Config.Message)
}

func applyHello(r *gin.Engine) {
	r.GET("/hello", world)
}
