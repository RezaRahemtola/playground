package server

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type config struct {
	Host    string `envconfig:"SERVER_HOST" required:"true"`
	Port    string `envconfig:"SERVER_PORT" required:"true"`
	Message string `envconfig:"HELLO_MESSAGE" required:"true"`
	Secret  string `envconfig:"SECRET" required:"true"`
}

var Config config

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	if err := envconfig.Process("", &Config); err != nil {
		log.Fatal(err)
	}
}
