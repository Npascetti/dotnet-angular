import {Component, OnInit} from "@angular/core";
import {TweetService} from "../services/tweet.service";
import {Status} from "../classes/status";
import {Tweet} from "../classes/tweet";
import {ProfileService} from "../services/profile.service";
import {Profile} from "../classes/profile";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LikeService} from "../services/like.service";
import {Like} from "../classes/like";




@Component({
	selector: "list-tweet",
	templateUrl: "./templates/list-tweets.html"
})

export class ListTweetsComponent implements OnInit{

	createTweetForm: FormGroup;

	tweet : Tweet = new Tweet (null, null, null, null);


	profile: Profile = new Profile(null,null,null,null,null);

	//declare needed state variables for latter use
	status: Status = null;

	tweets: Tweet[] = [];


	constructor(  private formBuilder: FormBuilder, private profileService: ProfileService, private likeService : LikeService, private tweetService: TweetService ) {}

	//life cycling before my eyes
	ngOnInit() : void {
		this.listTweets();

		this.createTweetForm = this.formBuilder.group({
			tweetContent: [[Validators.maxLength(150), Validators.required]]
		});
	}

	getTweetProfile(): void {
		this.profileService.getProfile(this.tweet.tweetProfileId)
	}


	listTweets(): void {
		this.tweetService.getAllTweets()
			.subscribe(tweets => this.tweets = tweets);
	}
	createTweet(): void  {

		let tweet = new Tweet(null, null, this.createTweetForm.value.tweetContent, null);

		this.tweetService.createTweet(tweet)
	}

	/*
	createLike(profileId : string, tweetId : string) : void {

		//let like : Like = new Like(profileId, tweetId);

		this.likeService.createLike(like)
			.subscribe(
			status => {
				this.status = status;
				if(this.status.status === 200) {
					console.log("success");
				}
			});

	} */


}