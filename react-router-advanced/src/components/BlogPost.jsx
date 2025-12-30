import React from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  
  return (
    <div>
        <h2>Blog Post</h2>
        <p>This is the content of blog post with ID: {id}</p>
        </div>
    );
    }