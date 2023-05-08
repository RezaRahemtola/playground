package jwt

import (
	"SoftwareGoDay3/server"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var users = map[string]User{}

func createToken(email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Minute * 15).Unix(), // Token expires after 15 mins
	})
	return token.SignedString([]byte(server.Config.Secret))
}

func extractEmailFromToken(c *gin.Context) (string, error) {
	header := c.GetHeader("Authorization")
	bearerToken := strings.TrimPrefix(header, "Bearer ")
	token, err := jwt.Parse(bearerToken, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(server.Config.Secret), nil
	})
	if err != nil {
		return "", err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return fmt.Sprintf("%v", claims["email"]), err
	}
	return "", nil
}

type AuthResponse struct {
	AccessToken string `json:"accessToken"`
	User        `json:"user"`
	Message     string `json:"message"`
}

func register(c *gin.Context) {
	user := User{}
	if err := c.BindJSON(&user); err != nil {
		c.String(http.StatusBadRequest, "Bad Request")
		return
	}
	if isRegistered(user.Email) {
		c.String(http.StatusForbidden, "User already exists")
		return
	}
	token, err := createToken(user.Email)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	users[user.Email] = user
	response := AuthResponse{AccessToken: token, User: user, Message: "User successfully created"}
	c.JSON(http.StatusCreated, response)
}

func login(c *gin.Context) {
	user := User{}
	if err := c.BindJSON(&user); err != nil {
		c.String(http.StatusBadRequest, "Bad Request")
		return
	}
	if !isRegistered(user.Email) {
		c.String(http.StatusNotFound, "User not found")
		return
	}
	if users[user.Email].Password != user.Password {
		c.String(http.StatusNotFound, "Wrong password")
		return
	}
	token, err := createToken(user.Email)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	response := AuthResponse{AccessToken: token, User: user, Message: "Successful login"}
	c.JSON(http.StatusOK, response)
}

type MeResponse struct {
	User    `json:"user"`
	Message string `json:"message"`
}

func me(c *gin.Context) {
	email, err := extractEmailFromToken(c)
	if err != nil {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}
	if !isRegistered(email) {
		c.String(http.StatusNotFound, "Unknown user")
	}
	response := MeResponse{User: users[email], Message: "User found"}
	c.JSON(http.StatusOK, response)
}

func ApplyJwt(r *gin.Engine) {
	r.POST("/jwt/register", register)
	r.POST("/jwt/login", login)
	r.GET("/jwt/me", me)
}
