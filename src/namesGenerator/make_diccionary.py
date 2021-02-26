#!/usr/bin/env python3
from sys import argv
from random import choice


with open('names-es.txt', 'r') as f: names = f.read().split('\n')
with open('last_names-es.txt', 'r') as f: last_names = f.read().split('\n')


numClass = int(argv[1])
numAlumn = int(argv[2])



class_list = []
for i in range(numClass):
    a = []
    for j in range(numAlumn):
        #s = "{} {} {}".format(choice(names), choice(last_names), choice(last_names))
        s = [choice(names), choice(last_names), choice(last_names)]
        a.append(s)
    class_list.append(a)


print(class_list)







