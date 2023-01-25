const Journal = ({journal}) => {
    return ( <>

    <div className="card">
  <div className="tools">
    <div className="circle">
      <span className="red box"></span>
    </div>
    <div className="circle">
      <span className="yellow box"></span>
    </div>
    <div className="circle">
      <span className="green box"></span>
    </div>
  </div>
  <div className="card__content">
  </div>
</div>
    <h2>{new Date(journal._id).toLocaleString}</h2>

    <h2>Journal</h2>
    
    
    </> );
}
 
export default Journal;