.PHONY: install
install:
	@go mod tidy

.PHONY: build
build:
	@go build -o build/robot main.go

.PHONY: run
run:
	@build/robot

.PHONY: test
test:
	@go test ./...
