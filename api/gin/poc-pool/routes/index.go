package routes

import (
	"SoftwareGoDay3/routes/jwt"

	"github.com/gin-gonic/gin"
)

func ApplyRoutes(r *gin.Engine) error {
	applyHealth(r)
	applyHello(r)
	applyRepeat(r)
	applyPalindrome(r)
	jwt.ApplyJwt(r)
	return nil
}
