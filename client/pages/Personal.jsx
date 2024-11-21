import "../css/personal.css";

function Personal() {
  return (
    <>
      <h1>Hello (insert name)</h1>
      <div className="btn2">
        <button>Start Conversation?</button>
      </div>
    </>
  );
}

export default Personal;




// // React component to handle the POST request and render translations
// export const GetTranslations = ({ userText }) => {
//   const [response, setResponse] = React.useState(null);

//   const handleTranslation = async () => {
//     if (!userText) {
//       setResponse('Please provide text to translate.');
//       return;
//     }

//     try {
//       const formattedPrompt = await formatPrompt(userText);
//       const result = await promptFunc(formattedPrompt);
//       setResponse(result);
//     } catch (error) {
//       console.error('Error:', error);
//       setResponse('Internal Server Error');
//     }
//   };

//   React.useEffect(() => {
//     handleTranslation();
//   }, [userText]);

//   return (
//     <div>
//       <h1>Translation Service</h1>
//       <p>Input: {userText}</p>
//       <p>Response: {response}</p>
//     </div>
//   );
// };
