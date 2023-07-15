#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<unistd.h>
#include<sys/socket.h>
#include<netinet/in.h>

#define APP_MAX_BUFFER 1024
#define PORT 8082


int main() {
    // create a socket where the server will reside
    int server_fd, client_fd;

    // create a sock address or something like config for starting the server
    struct sockaddr_in address;
    int address_len = sizeof(address);

    char buffer[APP_MAX_BUFFER] = {0};

    // create a new socket for ipv4 and socket stream
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("Socket failed");
        exit(EXIT_FAILURE);
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);


    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }

    if (listen(server_fd, 1) < 0) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }

    while (1) {
        printf("Waiting for connection\n");
        if ((client_fd = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&address_len)) < 0) {
            perror("Accept failed");
            exit(EXIT_FAILURE);
        }


        char* http_response = "HTTP/1.1 200 OK\n"
                        "Content-Type: text/plain\n"
                        "Content-Length: 15\n\n"
                        "Hello World!\n";
        write(client_fd, http_response, strlen(http_response));
        write(client_fd, "12", 2);
        close(client_fd);
    }
    return 0;
}