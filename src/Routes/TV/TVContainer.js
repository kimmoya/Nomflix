import { TVApi } from "api";
import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        loading: true,
        error: null

    }

    async componentDidMount() {
        try {
            const {data: {result: topRated} } = await TVApi.topRated();
            const {data: {result: popular} } = await TVApi.popular();
            const {data: {result: airingToday} } = await TVApi.airingToday();
            this.setState ({ topRated, popular, airingToday});
        } catch {
            this.setState({
                error: "Can't find Tv information"
            });
        } finally {
            this.setState({ loading : false });
        }
    }

    render() {
        const { topRated, popular, airingToday, loading, error } = this.state;
        return (
        <TVPresenter 
            topRated = {topRated}
            popular = {popular}
            airingToday = {airingToday}
            loading = {loading}
            error = {error}
        />
        );
    }
}