# %%
import os
import warnings
from json import dumps, loads

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")

import sqlalchemy
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .engine import engine

def create_app(
    app=FastAPI(),
    origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
    ],
):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app


app = create_app()


def getEntries(columns, table):
    db = engine.connect()
    col_string = ", ".join(columns)
    query = sqlalchemy.text("""SELECT {} FROM {};""".format(col_string, table))
    fetched = db.execute(query).fetchall()
    json_entry = [dict(zip(columns, i)) for i in fetched]
    return fetched


@app.get("/health")
async def health():
    # print(engine)
    return {"message": "health ok"}


@app.get("/")
async def index():
    return {"message": "App Started"}


@app.get("/review/{review_id}")
async def getReview(review_id: str):
    with engine.connect() as db:
        query = sqlalchemy.text(
            """

            """
        )
        fetched = dict(db.execute(query).fetchone()._mapping)
        db.close()

    return {"data": fetched}