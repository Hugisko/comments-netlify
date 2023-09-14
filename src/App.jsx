import { useEffect, useState } from "react";
import "./App.css";
import Loading from './Loading';
import Comment from "./Comment";

function App() {
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const url = `/.netlify/functions/fetch`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      if(resp.status === 200){
        const data = await resp.json();  
        setComments(data.body);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(loading){
    return (
      <main>
        <Loading />
      </main>
    )
  }

  return (
    <main>
    <button className="btn" onClick={()=>setShow(!show)}>{show ? "hide" : "show"}</button>
      <div className="comments__container">
      {comments.length > 0 && show &&
        comments.map((comment) => {
          return <Comment key={comment.id} {...comment} />;
        })}
    </div>  
    </main>
  );
}

export default App;
