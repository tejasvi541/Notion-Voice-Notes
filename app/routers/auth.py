from fastapi import APIRouter, Depends, status, HTTPException, Response,Request

router = APIRouter(tags=["Authentication"])

@router.post("/auth")
async def auth():
    return {"message":"Login"}