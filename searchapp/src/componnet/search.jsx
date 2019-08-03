import React, { Component } from 'react';



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          results: [],
        }
        this.fetchData = this.fetchData.bind(this)
        
      }
    //  intial loading the results 
    componentDidMount() {
        var myHeaders = new Headers({
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin':'*',
            'X-Custom-Header': 'hello world'
          });
          
        fetch('http://127.0.0.1:5000/alarms', {
            headers: myHeaders
          })
      .then(res => res.json())
      .then((data) => {
        this.setState({ results: data })
      })
    }

    // render table to the results
    renderTableData() {
        return this.state.results.map((results, index) => {
           const { id, mac, sev, sec, desc } = results //destructuring
           return (
              <tr key={id}>
                 <td>{mac}</td>
                 <td>{sev}</td>
                 <td>{sec}</td>
                 <td>{desc}</td>
              </tr>
           )
        })
     }
     
    //  fetch the data from every search 
     fetchData() {

        const macid = document.getElementById('macid')
        const severity = document.getElementById('severity')
        const source1 = document.getElementById('source')
        const source = source1.value.toLowerCase()
   
        var url = new URL('http://127.0.0.1:5000/alarms?');


        if(macid.value !=='') {
          // validation of MAcid
            if(macid.value.length === 17 )  {
              document.getElementById("macid").classList.remove("validation");
              url.searchParams.append('macid',macid.value )
             } else {  
              document.getElementById("macid").classList.add("validation");
             }   
        } else {
          document.getElementById("macid").classList.add("validation");
        }
        
        if(severity.value !== '') {
          // validation on Severity
           if(severity.value.length === 1  )  {
            if(severity.value >= 1 &&  severity.value <= 5 )  {
              document.getElementById("severity").classList.remove("validation");
            url.searchParams.append('severity', severity.value )
           } else {
            document.getElementById("severity").classList.add("validation");
          }  
        } else {
          document.getElementById("severity").classList.add("validation");
        }
      } else {
        document.getElementById("severity").classList.add("validation");
      }
        
        if(source.length>0) {
          // validation on source
            if(source === 'subsys2' || source === 'subsys1'  ) {
              document.getElementById("source").classList.remove("validation");
              url.searchParams.append('source',source )
            } else {
            document.getElementById("source").classList.add("validation");
            }
        } else {
          document.getElementById("source").classList.add("validation");

        }
        var uri = url;
        var enc = encodeURI(uri);
        var dec = decodeURI(enc);
       
        var myHeaders = new Headers({
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin':'*',
            'X-Custom-Header': 'hello world'
          });
          
        fetch(dec, {
            headers: myHeaders
          })
      .then(res => res.json())
      .then((data) => {
        this.setState({ results: data })
      })      
     }
    
    //  on Key press adding ':' on input filed 
     onKeyPressed() {
      const macid = document.getElementById('macid')
      var v = macid.value;
			var l = v.length;
				var maxLen = 17;
				if(l >= 2 && l < maxLen) { 
					var v1;
					v1 = v;					
					/* Removing all ':' to calculate get actaul text */
					while(!(v1.indexOf(":") < 0)) { // Better use RegEx
						v1 = v1.replace(":", "")
					}					
					/* Insert ':' after ever 2 chars */
					if(v1.length%2 === 0) {
						macid.value = v + ":";
					}
				}
     }

    //  Clear all the Search filed data or refresh the page
     cleaeALl() {
      document.location.reload() 
     }


    render() { 
        return <div>
           <div className="search-container"> <h3>Search</h3>   </div>
            <div className="search-container"> 
            <div><input type="text" id="macid"  maxLength="17" name="macid" placeholder="Search for mac id .. " onKeyDown={this.onKeyPressed} /></div> 
            <br/>
            <div><input type="number" min='1' max="5" maxLength="1" id="severity" name="severity " placeholder="Search for Severity .. "   /></div>
            <br/>
            <div><input type="text" id="source" name="source" placeholder="Search for source .. "  /></div><br/>
            <div>
            <button className="search" onClick={this.fetchData}  >Search </button>
            <button className="search-clear" onClick={this.cleaeALl}  >Clear </button>
            </div>
            <br/>
            </div>
            <div className="container">
            <div> <h5> Total number of results :  {this.state.results.length }</h5>  </div>
            <br></br>
            <table cellPadding="0" cellSpacing="0" >
            <thead>
                <tr>
                <th>ID</th>
                <th>Mac id</th>
                <th>Severity</th>
                <th>Source</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {this.state.results.map(row => (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.macid}</td>
                <td>{row.severity}</td>
                 <td>{row.source}</td>
                <td>{row.description}</td>
           </tr>
             ))}
            </tbody>
           </table>
          </div>
    </div>;
    }
}
export default Search;