import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const serverURL = "";

const Search = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  //const [results, setFinalResults] = useState('');

  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); 

  const callApiFindSearchedMovie = async () => {
    const url = serverURL + "/api/SearchedMovies";
    console.log(url);

    const searchTitle = title.trim() === "" ? null : title;
    const searchActor = actor.trim() === "" ? null : actor;
    const searchDirector = director.trim() === "" ? null : director;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: searchTitle,
        actor: searchActor,
        director: searchDirector,
      }),
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("API response: ", body);
    return body;
  };

  const handleMovieSearch = () => {

    const allFieldsEmpty = !title && !actor && !director;

    // If all three fields are empty, show an alert message
    if (allFieldsEmpty) {
      alert("Please fill in at least one option");
      return;
    }

    callApiFindSearchedMovie().then((res) => {
      console.log("callApiFindSearchedMovie returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("callApiFindSearchedMovie parsed: ", parsed[0]);
      setSearchResults(parsed);
      setSearchPerformed(true);
    });

    // if (!title && !actor && !director) {
    //   setSearchResults([]); // Clear search results
    //   setSearchPerformed(false);
    //   return;
    // }
  };

  const calculateOverallAverageScore = () => {
    if (searchResults.length === 0) return 0;

    let totalScore = 0;
    let reviewCount = 0;

    searchResults.forEach((result) => {
      if (result.avg_review_score !== null) {
        totalScore += result.avg_review_score;
        reviewCount++;
      }
    });

    if (reviewCount === 0) return 0;

    return totalScore / reviewCount;
  };

  const headingStyle = {
    background: "#E1F5FE",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Search
          </Typography>
          <Link
            color="inherit"
            style={{ cursor: "pointer", marginRight: "20px" }}
            onClick={() => navigate("/")}
          >
            Landing
          </Link>
          <Link
            color="inherit"
            style={{ cursor: "pointer", marginRight: "20px" }}
            onClick={() => navigate("/review")}
          >
            Review
          </Link>
          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/mypage")}
          >
            My Page
          </Link>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: "20px" }}>
        <div style={headingStyle}>
          <Typography variant="h3" color="inherit" noWrap>
            Search Page
          </Typography>
          <Typography variant="h5" color="inherit" noWrap>
            Search for your favorite movies here!
          </Typography>
        </div>
      </div>

    {/* Search form using Grid */}
    <Grid container spacing={2} style={{ marginBottom: "20px", justifyContent: "center" }}>
      <Grid item xs={12} sm={8}>
        <TextField
          label="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
    <Grid container spacing={2} style={{ marginBottom: "20px", justifyContent: "center" }}>
      <Grid item xs={12} sm={8}>
        <TextField
          label="Actor's name"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
    <Grid container spacing={2} style={{ marginBottom: "20px", justifyContent: "center" }}>
      <Grid item xs={12} sm={8}>
        <TextField
          label="Director's name"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>

    {/* Use Material-UI Button with custom styles */}
    <div style={{ textAlign: "center", marginTop: "20px" }}>
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={handleMovieSearch}
      sx={{ width: "10%" }}
    >
      Search
    </Button>
    </div>

      {/* Display search results */}
      <div>
      {searchPerformed && searchResults.length > 0 ? ( 
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Movie Name
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Director Name
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Review Content
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  {index === 0 && (
                    <>
                      <td
                        style={{ border: "1px solid black", padding: "8px" }}
                        rowSpan={searchResults.length}
                      >
                        {result.name}
                      </td>
                      <td
                        style={{ border: "1px solid black", padding: "8px" }}
                        rowSpan={searchResults.length}
                      >
                        {result.director_name}
                      </td>
                    </>
                  )}
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {result.reviews}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <b>Overall Average Review Score:</b>
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <b>{calculateOverallAverageScore().toFixed(2)}</b>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : searchPerformed ? ( // Show "No results found" only if the search has been performed
          <Typography variant="body1" color="inherit">
            No results found.
          </Typography>
        ) : null} {/* Don't show anything if the search has not been performed */}
      </div>
    </div>
  );
};

export default Search;
