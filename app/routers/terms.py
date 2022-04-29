from fastapi import APIRouter

router = APIRouter(tags=["Terms"])

@router.get("/terms")
async def terms():
    return {"Term":"Logging in users to use the Study Buddy Voice Note App"}