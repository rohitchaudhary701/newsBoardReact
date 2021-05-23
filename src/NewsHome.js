import { React, useEffect, useState } from 'react';
import { 
	// makeStyles,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	InputBase,
	Typography,
	Container,
	
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";	
import {Pagination} from '@material-ui/lab';

const useStyles = makeStyles({
	root: {
		maxWidth: 385,
	},
	search: {
    position: 'relative',
    width: '100%',
		margin: '10px 0'
  },
	inputInput: {
    padding: '10px',
    width: '100%',
		border: '1px solid #000'
  },
	'& > *': {
		marginTop: "10px",
	},
	parent: {
		"display": "flex",
		"flex-wrap": "wrap",
		"column-gap": "20px",
		"justify-content": "center",
		"row-gap": "20px",
		"margin-bottom": "20px"
	}
});
const API_KEY = 'ea46e8f2ee47438e8b645887eb0715f9';
const newsCategory = 'entertainment';
const newsCountry = 'in';
const pageSize = 9;
const NewsHome = () => {
	const classes = useStyles();
	const [result, setResult] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	useEffect(() => {
		const API_URL = `https://newsapi.org/v2/top-headlines?pageSize=${pageSize}&country=${newsCountry}&category=${newsCategory}&apiKey=${API_KEY}&page=${page}`;
		(async () => {
			let result = await fetch(API_URL);
			result = await result.json()
			setResult(result.articles);
		})();
	}, [page])
	console.log(result)
	const filteredNews = result.filter(news => {
    return news.title.toLowerCase().includes(search.toLowerCase()) || news.description.toLowerCase().includes(search.toLowerCase())
  })
	console.log(filteredNews)
	const nextPage = (event, updatedPage) => {
		setPage(updatedPage)
	}
	const searchNews = (e) => {
		setSearch(e.target.value);
	}


	return (
		<Container maxWidth="lg">
			<div className={classes.search}>
					<InputBase
						placeholder="Search…"
						onChange={(e)=>{searchNews(e)}}
						className={classes.search}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
				</div>
			{filteredNews.length <= 0 ? (
				<div>News not found. Searching for news...</div>
			) : (
				<>
					
					<div className={classes.parent}>
						{filteredNews.map((value, index) => {
							return (
								<Card className={classes.root} key={index}>
									<CardActionArea>
										<CardMedia
											component="img"
											alt={value.title}
											height="240"
											image={value.urlToImage}
											title={value.title}
										/>
										<CardContent>
											<Typography gutterBottom variant="h6" component="h4">
												{value.title}
											</Typography>
											<Typography variant="body2" color="textSecondary" component="p">{value.description}</Typography>
										</CardContent>
									</CardActionArea>
									<CardActions>
										<Button href={value.url} component="button" variant="contained" color="primary">
											Read more...
        						</Button>
									</CardActions>
								</Card>
							)
						})}
					</div>
					<Pagination
						count={10}
						boundaryCount={1}
						color='primary'
						page={page}
						onChange={(event, page) => { nextPage(event, page) }}
					/>
				</>)}
		</Container>
	)
}

export default NewsHome;