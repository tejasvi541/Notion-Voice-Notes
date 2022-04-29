from fastapi import APIRouter, Depends, status, HTTPException, Response
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration


model_name = "facebook/blenderbot-400M-distill"
model = BlenderbotForConditionalGeneration.from_pretrained(model_name)
tokenizer = BlenderbotTokenizer.from_pretrained(model_name)

router = APIRouter(tags=["QuestionAnswer"])

@router.get("/qa")
async def qa(question: str = ""):
    inputs = tokenizer([question], return_tensors="pt")
    reply_ids = model.generate(**inputs)
    print(question)
    print(tokenizer.batch_decode(reply_ids)[0][4:-4])
    return {
        "Question" : f'{question}',
        "Answer" : f'{tokenizer.batch_decode(reply_ids)[0][4:-4]}'
        }