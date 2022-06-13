/*
** EPITECH PROJECT, 2022
** GitHub Workshop
** File description:
** Project main file
*/

#include <stdlib.h>
#include <stdio.h>

int main(int argc, char *const argv[])
{
    int result = 0;

    for (int i = 1; i < argc; i++)
        result += atoi(argv[i]);
    printf("Result is %d\n", result);
    return 0;
}
