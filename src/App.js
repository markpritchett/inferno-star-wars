import Inferno from 'inferno';
import Component from 'inferno-component';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      people: [],
      next: null,
      count: null
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.getPeople();
  }

  getPeople(url = 'http://swapi.co/api/people') {
    this.setState({ loading: true });
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ next: json.next });
        this.setState({ count: json.count });
        this.setState({ people: [...this.state.people, ...json.results] });
        this.setState({ loading: false });
      });
  }

  loadMore() {
    this.getPeople(this.state.next);
  }

  render() {
    return (
      <div className="ui container">
        <h1>React + Star Wars API</h1>

        <h2 className="ui header">
          <div className="content">
            People
            <div className="sub header">
              Showing {this.state.people.length} out of {this.state.count}
            </div>
          </div>
        </h2>

        <div className="ui section divider"></div>

        <div className="ui list">
          {
            this.state.people.map(person => {
              return (
                <div key={person.url} className="item">
                  <i className="user icon"></i>
                  <div className="content">
                    {person.name}
                  </div>
                </div>
              )
            })
          }
          {
            this.state.loading &&
            <div className="ui">
              <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
            </div>
          }
          {
            !this.state.loading && this.state.next &&
            <button className="ui primary button" onClick={this.loadMore}>Load More</button>
          }
        </div>
      </div>
    );
  }
}

export default App;
