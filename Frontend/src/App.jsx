import { useEffect, useState } from 'react'

import 'prismjs/themes/prism-tomorrow.css'; 
import prism from 'prismjs';
import Editor from 'react-simple-code-editor';
import axios from "axios"
import Markdown from  "react-markdown";

import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';

import './App.css'

function App() {
  const [loading, setLoading] = useState(false);   // ✅ move inside App
  const [count, setCount] = useState(0);
  const [code,setCode]=useState(`function sum(){
    return a+b;
    }`)

  const [review,setReview]=useState(``);

  useEffect(()=>{
    prism.highlightAll();
  },[]);

  async function reviewCode() {
    setLoading(true); // show loading while waiting
    const response = await axios.post("http://localhost:3000/ai/get-review", { code });
    setReview(response.data);
    setLoading(false); // hide loading once response arrives
  }

  const highlight = (code) =>
    prism.highlight(code, prism.languages.javascript, 'javascript'); // ✅ use lowercase prism

  return (
   <>
   <main>
    <div className="leftdiv">
      <div className="code">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={highlight}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            color: 'white',
            borderRadius: '0.5rem',
          }}
        />
      </div>
      <div onClick={reviewCode} className="review">Review</div>
    </div>

    <div className="rightdiv">
      {loading ? (
        <p className="loading">⚡ Analyzing your code magic... please wait ✨</p>
      ) : (
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
      )}
    </div>
   </main>
   </>
  )
}

export default App



// import { useEffect, useState } from 'react'

// import 'prismjs/themes/prism-tomorrow.css'; // or prism-tomorrow.css for dark theme
// import prism from 'prismjs';
// import Editor from 'react-simple-code-editor';
// import axios from "axios"
// import Markdown from  "react-markdown";

// import rehypeHighlight from "rehype-highlight";
// import 'highlight.js/styles/github-dark.css';

// import './App.css'
// const [loading, setLoading] = useState(false);
// function App() {
//   const [count, setCount] = useState(0);
//   const [code,setCode]=useState(`function sum(){
//     return a+b;
//     }`)

//     const [review,setReview]=useState(``);


    
//   useEffect(()=>{
//     prism.highlightAll();
//   },[]);


// // async function reviewCode(){

// //   const response=await axios.post("http://localhost:3000/ai/get-review",{code})
// //   setReview(response.data);
// // }
// async function reviewCode() {
//   setLoading(true); // show loading while waiting
//   const response = await axios.post("http://localhost:3000/ai/get-review", { code });
//   setReview(response.data);
//   setLoading(false); // hide loading once response arrives
// }


// const highlight = (code) =>
//     Prism.highlight(code, Prism.languages.javascript, 'javascript');


//   return (
//    <>

//    <main>
//     <div className="leftdiv">
//       <div className="code">
//         <Editor
//       value={code}
//       onValueChange={setCode}
//       highlight={highlight}
//       padding={10}
//       style={{
//         fontFamily: '"Fira code", "Fira Mono", monospace',
//         fontSize: 14,
       
//         color: 'white',
//         borderRadius: '0.5rem',
//       }}

//       // - onValueChange is part of a custom component’s API — like react-simple-code-editor — where the developers defined their own prop name and behavior to notify you when something changes.

//     />

//       </div>
//       <div onClick={reviewCode} className="review">Review</div>
//     </div>
//     {/* <div className="rightdiv">
//      <Markdown
//      rehypePlugins={[rehypeHighlight]}
      
      
//       >{ review}</Markdown>
//     </div> */}

//     <div className="rightdiv">
//   {loading ? (
//     <p className="loading">⚡ Analyzing your code magic... please wait ✨</p>
//   ) : (
//     <Markdown rehypePlugins={[rehypeHighlight]}>
//       {review}
//     </Markdown>
//   )}
// </div>

//    </main>
//    </>
//   )
// }

// export default App
