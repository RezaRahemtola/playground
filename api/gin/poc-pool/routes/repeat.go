package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func repeatMessage(c *gin.Context, msg string) {
	if msg == "" {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		c.String(http.StatusOK, msg)
	}
}

func repeatMyQuery(c *gin.Context) {
	repeatMessage(c, c.Query("message"))
}

func repeatMyParam(c *gin.Context) {
	repeatMessage(c, c.Param("message"))
}

func repeatMyBody(c *gin.Context) {
	var msg string
	if err := c.ShouldBind(&msg); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	} else {
		repeatMessage(c, msg)
	}
}

func repeatMyHeader(c *gin.Context) {
	repeatMessage(c, c.GetHeader("X-Message"))
}

func repeatMyCookie(c *gin.Context) {
	if message, err := c.Request.Cookie("message"); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		repeatMessage(c, message.Value)
	}
}

type Queries struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

func repeatAllMyQueries(c *gin.Context) {
	queries := c.Request.URL.Query()
	if len(queries) == 0 {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	objs := make([]Queries, len(queries))
	idx := 0
	for key, values := range queries {
		objs[idx].Key = key
		objs[idx].Value = values[0]
		idx += 1
	}
	c.JSON(http.StatusOK, objs)
}

func applyRepeat(r *gin.Engine) {
	r.GET("/repeat-my-query", repeatMyQuery)
	r.GET("/repeat-my-param/:message", repeatMyParam)
	r.POST("/repeat-my-body", repeatMyBody)
	r.GET("/repeat-my-header", repeatMyHeader)
	r.GET("/repeat-my-cookie", repeatMyCookie)
	r.GET("/repeat-all-my-queries", repeatAllMyQueries)
}
