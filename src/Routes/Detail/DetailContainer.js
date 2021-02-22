import React from "react";
import DetailPresenter from "./DetailPresenters";
import { MoviesApi, TVApi } from "api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: {pathname}
        } = props;
    this.state = {
        result: null,
        error: null,
        loading: true,
        isMovie: pathname.includes("/movie/")
    };
}

    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
            history: { push }
        } = this.props;
        const  { isMovie } = this.state;
        const parseId = parseInt(id);
        if(isNaN(parseId)){
            return push("/")
        }
        let result = null;
        try {
            if(isMovie) {
                ({
                    data:result
                } = await MoviesApi.movieDetail(parseId));
            } else {
                ({
                    data:result
                } = await TVApi.showDetail(parseId));
            }
        } catch {
            this.setState({ error: "Can't find anything"});
        } finally {
            this.setState({ loading: false, result});
        }
    }

    render() {
        const { result, error, loading } = this.state;
        return (
        <DetailPresenter
            result = {result}
            error = {error}
            loading = {loading}
        />
      );
    }
}