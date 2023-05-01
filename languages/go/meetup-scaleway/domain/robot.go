package domain

import (
	"fmt"
)

type Surface struct {
	Xmax int
	Ymax int
	Xmin int
	Ymin int
}

type Robot struct {
	Name      string
	X         int
	Y         int
	Direction uint
}

func (r Robot) Hello() string {
	return fmt.Sprintf("Hello, %s", r.Name)
}

func HandleMovements(r *Robot, s Surface, input string) {
	for _, char := range input {
		switch char {
		case 'F':
			move(r, s, 1)
		case 'B':
			move(r, s, -1)
		case 'L':
			turnLeft(r)
		case 'R':
			turnRight(r)
		}
	}
}

func move(r *Robot, s Surface, nb int) {
	switch r.Direction {
	case 0:
		// Heading north
		if (nb == 1 && s.Ymax >= r.Y+1) || (nb == -1 && s.Ymin <= r.Y-1) {
			r.Y += nb
		}
	case 1:
		// Heading east
		if (nb == 1 && s.Xmax >= r.X+1) || (nb == -1 && s.Xmin <= r.X-1) {
			r.X += nb
		}
	case 2:
		// Heading south
		if (nb == 1 && s.Ymin <= r.Y-1) || (nb == -1 && s.Ymax >= r.Y+1) {
			r.Y -= nb
		}
	case 3:
		// Heading west
		if (nb == -1 && s.Xmin <= r.X-1) || (nb == -1 && s.Xmax >= r.X+1) {
			r.X -= nb
		}
	}
}

func turnLeft(r *Robot) {
	r.Direction = (r.Direction + 3) % 4
}

func turnRight(r *Robot) {
	r.Direction = (r.Direction + 1) % 4
}
