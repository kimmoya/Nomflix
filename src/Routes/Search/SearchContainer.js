import { MoviesApi, TVApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        loading: false,
        error: null
    }

    handleSubmit = event => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== "") {
            this.searchByTerm();
        }
    };

    updateTerm = event => {
        const {
          target: { value }
        } = event;
        this.setState({
          searchTerm: value
        });
      };
    

    searchByTerm = async() => {
        const { searchTerm } = this.state;
        this.setState({ loading: true });
        try {
            const {data: { result: movieResults} } = await MoviesApi.search(searchTerm);
            const {data: { result: tvResults} } = await TVApi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            });

        } catch {
            this.setState({ error: "Can't find results "});

        } finally {
            this.setState( { loading: false });
        }
    };

    render() {
        const { movieResults, tvResults, searchTerm, loading, error } = this.state;
        return (
        <SearchPresenter 
            movieResults = {movieResults}
            tvResults = {tvResults}
            loading = {loading}
            error = {error}
            searchTerm = {searchTerm}
            handleSubmit = {this.handleSubmit}
            updateTerm={this.updateTerm}
        />
        );
    }
}