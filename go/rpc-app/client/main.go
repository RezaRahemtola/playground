package main

import (
	"fmt"
	"log"
	"net/rpc"
)

type Item struct {
	Title string
	Body  string
}

func main() {
	var reply Item
	var db []Item

	client, err := rpc.DialHTTP("tcp", "localhost:4040")

	if err != nil {
		log.Fatal("Connection error: ", err)
	}

	a := Item{"First", "A first item"}
	b := Item{"Second", "A second item"}
	c := Item{"Third", "A third item"}

	_ = client.Call("API.AddItem", a, &reply)
	_ = client.Call("API.AddItem", b, &reply)
	_ = client.Call("API.AddItem", c, &reply)
	_ = client.Call("API.GetDB", "", &db)

	fmt.Println("Database: ", db)

	_ = client.Call("API.EditItem", Item{"Second", "A new second item"}, &reply)

	_ = client.Call("API.DeleteItem", c, &reply)
	_ = client.Call("API.GetDB", "", &db)

	fmt.Println("Database: ", db)

	_ = client.Call("API.GetByName", "First", &reply)
	fmt.Println("first item: ", reply)
}
