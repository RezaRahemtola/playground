package main

import (
	"SoftwareGoDay3/routes"
	"SoftwareGoDay3/server"
	"fmt"
	"log"
)

func main() {
	app := server.NewServer()
	if err := routes.ApplyRoutes(app.Engine); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Server listening on http://%s:%s\n", server.Config.Host, server.Config.Port)
	if err := app.Run(":" + server.Config.Port); err != nil {
		log.Fatal(err)
	}
}
