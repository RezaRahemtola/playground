package jwt

// Function to check if a given email is already registered
func isRegistered(email string) bool {
	_, ok := users[email]
	return ok
}
