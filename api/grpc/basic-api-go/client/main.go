package main

import (
	"basic-api-go/proto"
	"fmt"
	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"net/http"
	"strconv"
)

func getRequestObject(ctx *gin.Context) (*proto.Request, error) {
	a, err := strconv.ParseInt(ctx.Param("a"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Parameter A"})
		return nil, err
	}

	b, err := strconv.ParseInt(ctx.Param("b"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Parameter B"})
		return nil, err
	}
	return &proto.Request{A: a, B: b}, nil
}

func setupRoutes(g *gin.Engine, client proto.AddServiceClient) {
	g.GET("/add/:a/:b", func(ctx *gin.Context) {
		req, err := getRequestObject(ctx)
		if err != nil {
			return
		}

		if response, err := client.Add(ctx, req); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		} else {
			ctx.JSON(http.StatusOK, gin.H{"result": fmt.Sprint(response.Result)})
		}
	})
	g.GET("/mul/:a/:b", func(ctx *gin.Context) {
		req, err := getRequestObject(ctx)
		if err != nil {
			return
		}

		if response, err := client.Multiply(ctx, req); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		} else {
			ctx.JSON(http.StatusOK, gin.H{"result": fmt.Sprint(response.Result)})
		}
	})
}

func main() {
	conn, err := grpc.Dial("localhost:4040", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}

	client := proto.NewAddServiceClient(conn)

	g := gin.Default()

	setupRoutes(g, client)

	if err := g.Run(":8080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
