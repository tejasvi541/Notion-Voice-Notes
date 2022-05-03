import imp
from fastapi import APIRouter, Depends, status, HTTPException, Response,Request
from requests import Request, Session
import requests as rr

router = APIRouter(tags=["Authentication"])

notion_client_id = ""
notion_client_secret = ""

@router.get("/login/{code}")
async def auth(code:str):
    print(code)
    return {"code" : code}


    