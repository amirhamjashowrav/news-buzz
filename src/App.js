import React from 'react';
import Header from './components/Header/header.jsx';
import News, { newsCategory } from './components/News/news';
import NewsList from './components/NewsList/newsList.jsx';
import Pagination from './components/Pagination/Pagination.jsx';
import Loading from './components/Loading/Loading.jsx';
//import RefTest from './components/RefTest';

const news = new News(newsCategory.technology);

class App extends React.Component {

  state = {
    data: {},
    isLoading: true
  };

  aboutResult = React.createRef();
  // jumbotronRef = React.createRef();
  searchRef = React.createRef();
  cbRef = null;
  itemListRef = [];

  componentDidMount() {
    news.getNews()
      .then((data) => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e)
        alert('Someething Went Wrong');
        this.setState({ isLoading: false })
      });
      console.log(this.searchRef);
      this.searchRef.current.focus();
      console.log(this.cbRef);
      console.log(this.itemListRef);
  }

 

  goToTop = () => {
    window.scrollTo(0, this.aboutResult.current.scrollTop);
  };

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true })
    }
    news.next()
      .then((data) => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e)
        alert('Someething Went Wrong');
        this.setState({ isLoading: false });
      })
  }

  prev = () => {
    if (this.state.data.isPrevious) {
      this.setState({ isLoading: true })
    }
    news.prev()
      .then((data) => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e)
        alert('Someething Went Wrong');
        this.setState({ isLoading: false })
      })
  }

  handlePageChange = value => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value)
      },
    });
  };

  goToPage = () => {
    this.setState({ isLoading: true })
    news.setCurrentPage(this.state.data.currentPage)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch(e => {
        console.log(e)
        alert('Someething Went Wrong');
        this.setState({ isLoading: false })
      });
  };

  changeCategory = category => {
    this.setState({ isLoading: true })
    news.changeCategory(category)
      .then((data) => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e)
        alert('Someething Went Wrong');
        this.setState({ isLoading: false })
      })
  }

  search = searchTerm => {
    this.setState({ isLoading: true })
    news.search(searchTerm)
      .then((data) => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e)
        alert('Someething Went Wrong');
        this.setState({ isLoading: false })
      })
  }

  refCallBack = (element) => {
    this.cbRef = element;
  }

  render() {
    const { article, isPrevious, isNext, category, totalResults, currentPage, totalPage } = this.state.data;

    return (
      <div className='container'>
        <div className='Row'>
          <div className='col-sm-6 offset-md-3'>
            <Header
              category={category}
              changeCategory={this.changeCategory}
              search={this.search}
              ref={this.searchRef}
            />
            <div ref={this.aboutResult} className='d-flex'>
              <p ref={this.refCallBack} className='text-black-50'>
                About {totalResults} results found
              </p>
              <p className='text-black-50 ms-auto'>
                {currentPage} page of {totalPage}
              </p>
            </div>
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <div>
                <NewsList ref={this.itemListRef} news={article} />
                <Pagination
                  next={this.next}
                  prev={this.prev}
                  isPrevious={isPrevious}
                  isNext={isNext}
                  totalPage={totalPage}
                  currentPage={currentPage}
                  handlePageChange={this.handlePageChange}
                  goToPage={this.goToPage}
                />
                <button className="btn btn-secondary my-5"
                  onClick={this.goToTop}
                >
                  Go To Top
                </button>
              </div>
            )}
            {/* <RefTest ref={this.jumbotronRef}/> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App;