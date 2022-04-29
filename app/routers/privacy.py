from fastapi import APIRouter

router = APIRouter(tags=["Privacy"])

@router.post("/privacy")
async def privacy():
    return {"Privacy Policy":"Minimal user data like email is seen by the app"}