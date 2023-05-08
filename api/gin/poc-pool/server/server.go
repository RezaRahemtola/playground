package server

import (
	"github.com/gin-gonic/gin"
)

type Server struct {
	*gin.Engine
}

func NewServer() *Server {
	return &Server{gin.Default()}
}
