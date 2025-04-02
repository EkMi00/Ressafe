# %%
import os
import warnings
from json import dumps, loads

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")

import sqlalchemy
import uvicorn
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .engine import engine

def create_app(
    app=FastAPI(),
    origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
        "https://sincere-equipped-ghoul.ngrok-free.app",
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


@app.get("/reviews")
async def getReviews():
    with engine.connect() as db:
        query = sqlalchemy.text(
            """ 
            SELECT * 
            FROM articles
            ORDER BY date DESC
            LIMIT 6;
            """
        )
        fetched = db.execute(query).fetchall()
        db.close()
    data = pd.DataFrame(fetched).to_dict(orient="records")
    return {"data": data}


@app.post("/add_article")
async def addReview(
        article_id: str = Query(..., min_length=8, max_length=8, description="8-character unique article ID"),
        url: str = Query(..., description="URL of the article"),
        date: str = Query(..., regex=r"^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$", description="Date in format YYYY-MM-DD HH:MM:SS"),
        summary: str = Query(..., description="Summary of the article"),
        comment: str = Query(..., description="Comment about the article")
    ):
    try:
        with engine.connect() as db:
            query = sqlalchemy.text(
                """
                INSERT INTO articles (article_id, url, date, summary, comment)
                VALUES (:article_id, :url, :date, :summary, :comment);
                """
            )
            db.execute(
                query,
                {
                    "article_id": article_id,
                    "url": url,
                    "date": date,
                    "summary": summary,
                    "comment": comment,
                },
            )
            db.commit()
        return {"message": "Review added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while adding the review: {str(e)}")
    

@app.get("/article/{article_id}")
async def getArticle(article_id: str):
    with engine.connect() as db:
        query = sqlalchemy.text(
            """ 
            SELECT *
            FROM articles
            WHERE article_id = "{}";
            """.format(article_id)
        )
        fetched = dict(db.execute(query).fetchone()._mapping)
        db.close()

    return {"data": fetched}

@app.get("/reviews/{article_id}")
async def getReviewsByArticle(article_id: str):
    with engine.connect() as db:
        query = sqlalchemy.text(
            """ 
            SELECT * 
            FROM reviews
            WHERE article_id = '{}'
            ORDER BY reviewDate DESC;
            """.format(article_id)
        )
        fetched = pd.DataFrame(db.execute(query).fetchall())
        db.close()

    fetched['positive'] = fetched['positive'].apply(loads)
    fetched['negative'] = fetched['negative'].apply(loads)
    fetched['ambiguous'] = fetched['ambiguous'].apply(loads)
    data = fetched.to_dict(orient='records')

    return {"data": data}

@app.get("/check_article/{article_id}")
async def checkArticleExists(article_id: str):
    """
    Endpoint to check if an article_id exists in the database.
    """
    with engine.connect() as db:
        query = sqlalchemy.text(
            """
            SELECT EXISTS (
                SELECT 1 
                FROM articles 
                WHERE article_id = :article_id
            );
            """
        )
        result = db.execute(query, {"article_id": article_id}).fetchone()
        db.close()
    # Return whether the article exists
    return {"exists": result[0]}

@app.get("/check_review/{review_id}")
async def checkReviewExists(review_id: str):
    """
    Endpoint to check if a review_id exists in the database.
    """
    try:
        with engine.connect() as db:
            query = sqlalchemy.text(
                """
                SELECT EXISTS (
                    SELECT 1 
                    FROM reviews 
                    WHERE review_id = :review_id
                );
                """
            )
            result = db.execute(query, {"review_id": review_id}).fetchone()
            db.close()
        # Return whether the review exists
        return {"exists": result[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while checking the review: {str(e)}")


@app.post("/add_review")
async def addReview(
    review_id: str = Query(..., min_length=8, max_length=8, description="8-character unique review ID"),
    article_id: str = Query(..., min_length=8, max_length=8, description="8-character unique article ID"),
    rating: str = Query(..., description="Rating of the review (e.g., 'helpful', 'not helpful')"),
    comments: str = Query(..., description="Comments about the article"),
    positive: str = Query(..., description="JSON string of positive tags"),
    negative: str = Query(..., description="JSON string of negative tags"),
    ambiguous: str = Query(..., description="JSON string of ambiguous tags"),
    username: str = Query(..., description="Username of the reviewer"),
    date: str = Query(..., regex=r"^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$", description="Date in format YYYY-MM-DD HH:MM:SS")
):
    """
    Endpoint to add a review to the database.
    """
    try:
        with engine.connect() as db:
            query = sqlalchemy.text(
                """
                INSERT INTO reviews (review_id, article_id, rating, comments, positive, negative, ambiguous, username, reviewDate)
                VALUES (:review_id, :article_id, :rating, :comments, :positive, :negative, :ambiguous, :username, :date);
                """
            )
            db.execute(
                query,
                {
                    "review_id": review_id,
                    "article_id": article_id,
                    "rating": rating,
                    "comments": comments,
                    "positive": positive,
                    "negative": negative,
                    "ambiguous": ambiguous,
                    "username": username,
                    "date": date,
                },
            )
            db.commit()
        return {"message": "Review added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while adding the review: {str(e)}")
    

@app.get("/get_all_review_ids/{article_id}")
async def getAllReviewIds(article_id: str):
    """
    Endpoint to retrieve all review IDs for a specific article_id from the database.
    """
    try:
        with engine.connect() as db:
            query = sqlalchemy.text(
                """
                SELECT review_id 
                FROM reviews
                WHERE article_id = :article_id;
                """
            )
            result = db.execute(query, {"article_id": article_id}).fetchall()
            db.close()

        # Extract review IDs from the result
        review_ids = [row[0] for row in result]
        return {"review_ids": review_ids}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving review IDs: {str(e)}")