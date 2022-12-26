from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

logger = logging.getLogger()

logger.setLevel(logging.DEBUG)

console_handler = logging.StreamHandler()

log_format = '%(asctime)s | %(levelname)s: %(message)s'
console_handler.setFormatter(logging.Formatter(log_format))

logger.addHandler(console_handler)

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)["test_db"]


class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        collection = db["todos"]
        try:
            todos = collection.find()
            todoList = [document["todo"] for document in todos]
            if todos is not None:
                return Response({"res": todoList}, status=status.HTTP_200_OK)
            else:
                return Response({"No entries found"}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"Cound not fetch todos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        collection = db["todos"]
        #logger.debug(request.data)
        
        logger.debug(request.__dict__)
        if request.data and request.data['todo']:
            todo_entry = request.data['todo']
        try:
            #logger.debug(todo_entry)
            collection.insert(request.data)
            return Response({"Entry added successfully"}, status=status.HTTP_200_OK)
        except:
            return Response({"Could not add entry"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

