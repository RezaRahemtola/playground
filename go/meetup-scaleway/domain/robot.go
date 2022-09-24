package domain

import (
	"fmt"
)

type Surface struct {
	Xmax uint
	Ymax uint
	Xmin uint
	Ymin uint
}

type Robot struct {
	Name string
	X uint 
	Y uint 
	Direction uint
}

func (r Robot) Hello() string {
	return fmt.Sprintf("Hello, %s", r.Name)
}

func (r Robot) turnLeft() { 
	r.Direction = (r.Direction + 3) % 4
}

func (r Robot) turnRight() { 
	r.Direction = (r.Direction + 1) % 4
}
