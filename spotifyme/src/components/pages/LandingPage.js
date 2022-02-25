import React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";

import AuthorizeUser from "../../containers/AuthenticationContainer/authorizeUser";
import { spotifyGreen, spotifyGreenDark } from "../Button";
import ICard from "../ItemCard";
import "react-spotify-auth/dist/index.css"; // if using the included styles

// Creates the shadow of the landing page.
function setShadow() {
	let colorValue = 0x106b30;
	let shadow = "";
	for (let i = 0; i < 500; i++) {
		colorValue += 0x004000;
		shadow +=
			(shadow ? "," : "") +
			i * 1 +
			"px " +
			i * 1 +
			`px 0 #${colorValue.toString(16)}`;
	}
	console.log(shadow);
}

export default function LandingPage() {
	const landingColor = "#1ed760";
	const landingColorDark = "#106b30";

	return (
		<Grid container sx={{ height: "100vh" }}>
			{/* Background area (left) */}
			<Grid
				item
				sm={4}
				md={7}
				style={{
					backgroundColor: landingColor,
					backgroundSize: "cover",
					backgroundPosition: "center",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography
					id="spotify-text"
					variant="h3"
					style={{
						color: "#fff",
						fontWeight: "900",
						fontSize: "95px",
						textShadow:
							"0px 0px 0 #10ab30,1px 1px 0 #10eb30,2px 2px 0 #112b30,3px 3px 0 #116b30,4px 4px 0 #11ab30,5px 5px 0 #11eb30,6px 6px 0 #122b30,7px 7px 0 #126b30,8px 8px 0 #12ab30,9px 9px 0 #12eb30,10px 10px 0 #132b30,11px 11px 0 #136b30,12px 12px 0 #13ab30,13px 13px 0 #13eb30,14px 14px 0 #142b30,15px 15px 0 #146b30,16px 16px 0 #14ab30,17px 17px 0 #14eb30,18px 18px 0 #152b30,19px 19px 0 #156b30,20px 20px 0 #15ab30,21px 21px 0 #15eb30,22px 22px 0 #162b30,23px 23px 0 #166b30,24px 24px 0 #16ab30,25px 25px 0 #16eb30,26px 26px 0 #172b30,27px 27px 0 #176b30,28px 28px 0 #17ab30,29px 29px 0 #17eb30,30px 30px 0 #182b30,31px 31px 0 #186b30,32px 32px 0 #18ab30,33px 33px 0 #18eb30,34px 34px 0 #192b30,35px 35px 0 #196b30,36px 36px 0 #19ab30,37px 37px 0 #19eb30,38px 38px 0 #1a2b30,39px 39px 0 #1a6b30,40px 40px 0 #1aab30,41px 41px 0 #1aeb30,42px 42px 0 #1b2b30,43px 43px 0 #1b6b30,44px 44px 0 #1bab30,45px 45px 0 #1beb30,46px 46px 0 #1c2b30,47px 47px 0 #1c6b30,48px 48px 0 #1cab30,49px 49px 0 #1ceb30,50px 50px 0 #1d2b30,51px 51px 0 #1d6b30,52px 52px 0 #1dab30,53px 53px 0 #1deb30,54px 54px 0 #1e2b30,55px 55px 0 #1e6b30,56px 56px 0 #1eab30,57px 57px 0 #1eeb30,58px 58px 0 #1f2b30,59px 59px 0 #1f6b30,60px 60px 0 #1fab30,61px 61px 0 #1feb30,62px 62px 0 #202b30,63px 63px 0 #206b30,64px 64px 0 #20ab30,65px 65px 0 #20eb30,66px 66px 0 #212b30,67px 67px 0 #216b30,68px 68px 0 #21ab30,69px 69px 0 #21eb30,70px 70px 0 #222b30,71px 71px 0 #226b30,72px 72px 0 #22ab30,73px 73px 0 #22eb30,74px 74px 0 #232b30,75px 75px 0 #236b30,76px 76px 0 #23ab30,77px 77px 0 #23eb30,78px 78px 0 #242b30,79px 79px 0 #246b30,80px 80px 0 #24ab30,81px 81px 0 #24eb30,82px 82px 0 #252b30,83px 83px 0 #256b30,84px 84px 0 #25ab30,85px 85px 0 #25eb30,86px 86px 0 #262b30,87px 87px 0 #266b30,88px 88px 0 #26ab30,89px 89px 0 #26eb30,90px 90px 0 #272b30,91px 91px 0 #276b30,92px 92px 0 #27ab30,93px 93px 0 #27eb30,94px 94px 0 #282b30,95px 95px 0 #286b30,96px 96px 0 #28ab30,97px 97px 0 #28eb30,98px 98px 0 #292b30,99px 99px 0 #296b30,100px 100px 0 #29ab30,101px 101px 0 #29eb30,102px 102px 0 #2a2b30,103px 103px 0 #2a6b30,104px 104px 0 #2aab30,105px 105px 0 #2aeb30,106px 106px 0 #2b2b30,107px 107px 0 #2b6b30,108px 108px 0 #2bab30,109px 109px 0 #2beb30,110px 110px 0 #2c2b30,111px 111px 0 #2c6b30,112px 112px 0 #2cab30,113px 113px 0 #2ceb30,114px 114px 0 #2d2b30,115px 115px 0 #2d6b30,116px 116px 0 #2dab30,117px 117px 0 #2deb30,118px 118px 0 #2e2b30,119px 119px 0 #2e6b30,120px 120px 0 #2eab30,121px 121px 0 #2eeb30,122px 122px 0 #2f2b30,123px 123px 0 #2f6b30,124px 124px 0 #2fab30,125px 125px 0 #2feb30,126px 126px 0 #302b30,127px 127px 0 #306b30,128px 128px 0 #30ab30,129px 129px 0 #30eb30,130px 130px 0 #312b30,131px 131px 0 #316b30,132px 132px 0 #31ab30,133px 133px 0 #31eb30,134px 134px 0 #322b30,135px 135px 0 #326b30,136px 136px 0 #32ab30,137px 137px 0 #32eb30,138px 138px 0 #332b30,139px 139px 0 #336b30,140px 140px 0 #33ab30,141px 141px 0 #33eb30,142px 142px 0 #342b30,143px 143px 0 #346b30,144px 144px 0 #34ab30,145px 145px 0 #34eb30,146px 146px 0 #352b30,147px 147px 0 #356b30,148px 148px 0 #35ab30,149px 149px 0 #35eb30,150px 150px 0 #362b30,151px 151px 0 #366b30,152px 152px 0 #36ab30,153px 153px 0 #36eb30,154px 154px 0 #372b30,155px 155px 0 #376b30,156px 156px 0 #37ab30,157px 157px 0 #37eb30,158px 158px 0 #382b30,159px 159px 0 #386b30,160px 160px 0 #38ab30,161px 161px 0 #38eb30,162px 162px 0 #392b30,163px 163px 0 #396b30,164px 164px 0 #39ab30,165px 165px 0 #39eb30,166px 166px 0 #3a2b30,167px 167px 0 #3a6b30,168px 168px 0 #3aab30,169px 169px 0 #3aeb30,170px 170px 0 #3b2b30,171px 171px 0 #3b6b30,172px 172px 0 #3bab30,173px 173px 0 #3beb30,174px 174px 0 #3c2b30,175px 175px 0 #3c6b30,176px 176px 0 #3cab30,177px 177px 0 #3ceb30,178px 178px 0 #3d2b30,179px 179px 0 #3d6b30,180px 180px 0 #3dab30,181px 181px 0 #3deb30,182px 182px 0 #3e2b30,183px 183px 0 #3e6b30,184px 184px 0 #3eab30,185px 185px 0 #3eeb30,186px 186px 0 #3f2b30,187px 187px 0 #3f6b30,188px 188px 0 #3fab30,189px 189px 0 #3feb30,190px 190px 0 #402b30,191px 191px 0 #406b30,192px 192px 0 #40ab30,193px 193px 0 #40eb30,194px 194px 0 #412b30,195px 195px 0 #416b30,196px 196px 0 #41ab30,197px 197px 0 #41eb30,198px 198px 0 #422b30,199px 199px 0 #426b30,200px 200px 0 #42ab30,201px 201px 0 #42eb30,202px 202px 0 #432b30,203px 203px 0 #436b30,204px 204px 0 #43ab30,205px 205px 0 #43eb30,206px 206px 0 #442b30,207px 207px 0 #446b30,208px 208px 0 #44ab30,209px 209px 0 #44eb30,210px 210px 0 #452b30,211px 211px 0 #456b30,212px 212px 0 #45ab30,213px 213px 0 #45eb30,214px 214px 0 #462b30,215px 215px 0 #466b30,216px 216px 0 #46ab30,217px 217px 0 #46eb30,218px 218px 0 #472b30,219px 219px 0 #476b30,220px 220px 0 #47ab30,221px 221px 0 #47eb30,222px 222px 0 #482b30,223px 223px 0 #486b30,224px 224px 0 #48ab30,225px 225px 0 #48eb30,226px 226px 0 #492b30,227px 227px 0 #496b30,228px 228px 0 #49ab30,229px 229px 0 #49eb30,230px 230px 0 #4a2b30,231px 231px 0 #4a6b30,232px 232px 0 #4aab30,233px 233px 0 #4aeb30,234px 234px 0 #4b2b30,235px 235px 0 #4b6b30,236px 236px 0 #4bab30,237px 237px 0 #4beb30,238px 238px 0 #4c2b30,239px 239px 0 #4c6b30,240px 240px 0 #4cab30,241px 241px 0 #4ceb30,242px 242px 0 #4d2b30,243px 243px 0 #4d6b30,244px 244px 0 #4dab30,245px 245px 0 #4deb30,246px 246px 0 #4e2b30,247px 247px 0 #4e6b30,248px 248px 0 #4eab30,249px 249px 0 #4eeb30,250px 250px 0 #4f2b30,251px 251px 0 #4f6b30,252px 252px 0 #4fab30,253px 253px 0 #4feb30,254px 254px 0 #502b30,255px 255px 0 #506b30,256px 256px 0 #50ab30,257px 257px 0 #50eb30,258px 258px 0 #512b30,259px 259px 0 #516b30,260px 260px 0 #51ab30,261px 261px 0 #51eb30,262px 262px 0 #522b30,263px 263px 0 #526b30,264px 264px 0 #52ab30,265px 265px 0 #52eb30,266px 266px 0 #532b30,267px 267px 0 #536b30,268px 268px 0 #53ab30,269px 269px 0 #53eb30,270px 270px 0 #542b30,271px 271px 0 #546b30,272px 272px 0 #54ab30,273px 273px 0 #54eb30,274px 274px 0 #552b30,275px 275px 0 #556b30,276px 276px 0 #55ab30,277px 277px 0 #55eb30,278px 278px 0 #562b30,279px 279px 0 #566b30,280px 280px 0 #56ab30,281px 281px 0 #56eb30,282px 282px 0 #572b30,283px 283px 0 #576b30,284px 284px 0 #57ab30,285px 285px 0 #57eb30,286px 286px 0 #582b30,287px 287px 0 #586b30,288px 288px 0 #58ab30,289px 289px 0 #58eb30,290px 290px 0 #592b30,291px 291px 0 #596b30,292px 292px 0 #59ab30,293px 293px 0 #59eb30,294px 294px 0 #5a2b30,295px 295px 0 #5a6b30,296px 296px 0 #5aab30,297px 297px 0 #5aeb30,298px 298px 0 #5b2b30,299px 299px 0 #5b6b30,300px 300px 0 #5bab30,301px 301px 0 #5beb30,302px 302px 0 #5c2b30,303px 303px 0 #5c6b30,304px 304px 0 #5cab30,305px 305px 0 #5ceb30,306px 306px 0 #5d2b30,307px 307px 0 #5d6b30,308px 308px 0 #5dab30,309px 309px 0 #5deb30,310px 310px 0 #5e2b30,311px 311px 0 #5e6b30,312px 312px 0 #5eab30,313px 313px 0 #5eeb30,314px 314px 0 #5f2b30,315px 315px 0 #5f6b30,316px 316px 0 #5fab30,317px 317px 0 #5feb30,318px 318px 0 #602b30,319px 319px 0 #606b30,320px 320px 0 #60ab30,321px 321px 0 #60eb30,322px 322px 0 #612b30,323px 323px 0 #616b30,324px 324px 0 #61ab30,325px 325px 0 #61eb30,326px 326px 0 #622b30,327px 327px 0 #626b30,328px 328px 0 #62ab30,329px 329px 0 #62eb30,330px 330px 0 #632b30,331px 331px 0 #636b30,332px 332px 0 #63ab30,333px 333px 0 #63eb30,334px 334px 0 #642b30,335px 335px 0 #646b30,336px 336px 0 #64ab30,337px 337px 0 #64eb30,338px 338px 0 #652b30,339px 339px 0 #656b30,340px 340px 0 #65ab30,341px 341px 0 #65eb30,342px 342px 0 #662b30,343px 343px 0 #666b30,344px 344px 0 #66ab30,345px 345px 0 #66eb30,346px 346px 0 #672b30,347px 347px 0 #676b30,348px 348px 0 #67ab30,349px 349px 0 #67eb30,350px 350px 0 #682b30,351px 351px 0 #686b30,352px 352px 0 #68ab30,353px 353px 0 #68eb30,354px 354px 0 #692b30,355px 355px 0 #696b30,356px 356px 0 #69ab30,357px 357px 0 #69eb30,358px 358px 0 #6a2b30,359px 359px 0 #6a6b30,360px 360px 0 #6aab30,361px 361px 0 #6aeb30,362px 362px 0 #6b2b30,363px 363px 0 #6b6b30,364px 364px 0 #6bab30,365px 365px 0 #6beb30,366px 366px 0 #6c2b30,367px 367px 0 #6c6b30,368px 368px 0 #6cab30,369px 369px 0 #6ceb30,370px 370px 0 #6d2b30,371px 371px 0 #6d6b30,372px 372px 0 #6dab30,373px 373px 0 #6deb30,374px 374px 0 #6e2b30,375px 375px 0 #6e6b30,376px 376px 0 #6eab30,377px 377px 0 #6eeb30,378px 378px 0 #6f2b30,379px 379px 0 #6f6b30,380px 380px 0 #6fab30,381px 381px 0 #6feb30,382px 382px 0 #702b30,383px 383px 0 #706b30,384px 384px 0 #70ab30,385px 385px 0 #70eb30,386px 386px 0 #712b30,387px 387px 0 #716b30,388px 388px 0 #71ab30,389px 389px 0 #71eb30,390px 390px 0 #722b30,391px 391px 0 #726b30,392px 392px 0 #72ab30,393px 393px 0 #72eb30,394px 394px 0 #732b30,395px 395px 0 #736b30,396px 396px 0 #73ab30,397px 397px 0 #73eb30,398px 398px 0 #742b30,399px 399px 0 #746b30,400px 400px 0 #74ab30,401px 401px 0 #74eb30,402px 402px 0 #752b30,403px 403px 0 #756b30,404px 404px 0 #75ab30,405px 405px 0 #75eb30,406px 406px 0 #762b30,407px 407px 0 #766b30,408px 408px 0 #76ab30,409px 409px 0 #76eb30,410px 410px 0 #772b30,411px 411px 0 #776b30,412px 412px 0 #77ab30,413px 413px 0 #77eb30,414px 414px 0 #782b30,415px 415px 0 #786b30,416px 416px 0 #78ab30,417px 417px 0 #78eb30,418px 418px 0 #792b30,419px 419px 0 #796b30,420px 420px 0 #79ab30,421px 421px 0 #79eb30,422px 422px 0 #7a2b30,423px 423px 0 #7a6b30,424px 424px 0 #7aab30,425px 425px 0 #7aeb30,426px 426px 0 #7b2b30,427px 427px 0 #7b6b30,428px 428px 0 #7bab30,429px 429px 0 #7beb30,430px 430px 0 #7c2b30,431px 431px 0 #7c6b30,432px 432px 0 #7cab30,433px 433px 0 #7ceb30,434px 434px 0 #7d2b30,435px 435px 0 #7d6b30,436px 436px 0 #7dab30,437px 437px 0 #7deb30,438px 438px 0 #7e2b30,439px 439px 0 #7e6b30,440px 440px 0 #7eab30,441px 441px 0 #7eeb30,442px 442px 0 #7f2b30,443px 443px 0 #7f6b30,444px 444px 0 #7fab30,445px 445px 0 #7feb30,446px 446px 0 #802b30,447px 447px 0 #806b30,448px 448px 0 #80ab30,449px 449px 0 #80eb30,450px 450px 0 #812b30,451px 451px 0 #816b30,452px 452px 0 #81ab30,453px 453px 0 #81eb30,454px 454px 0 #822b30,455px 455px 0 #826b30,456px 456px 0 #82ab30,457px 457px 0 #82eb30,458px 458px 0 #832b30,459px 459px 0 #836b30,460px 460px 0 #83ab30,461px 461px 0 #83eb30,462px 462px 0 #842b30,463px 463px 0 #846b30,464px 464px 0 #84ab30,465px 465px 0 #84eb30,466px 466px 0 #852b30,467px 467px 0 #856b30,468px 468px 0 #85ab30,469px 469px 0 #85eb30,470px 470px 0 #862b30,471px 471px 0 #866b30,472px 472px 0 #86ab30,473px 473px 0 #86eb30,474px 474px 0 #872b30,475px 475px 0 #876b30,476px 476px 0 #87ab30,477px 477px 0 #87eb30,478px 478px 0 #882b30,479px 479px 0 #886b30,480px 480px 0 #88ab30,481px 481px 0 #88eb30,482px 482px 0 #892b30,483px 483px 0 #896b30,484px 484px 0 #89ab30,485px 485px 0 #89eb30,486px 486px 0 #8a2b30,487px 487px 0 #8a6b30,488px 488px 0 #8aab30,489px 489px 0 #8aeb30,490px 490px 0 #8b2b30,491px 491px 0 #8b6b30,492px 492px 0 #8bab30,493px 493px 0 #8beb30,494px 494px 0 #8c2b30,495px 495px 0 #8c6b30,496px 496px 0 #8cab30,497px 497px 0 #8ceb30,498px 498px 0 #8d2b30,499px 499px 0 #8d6b30",
					}}>
					SpotifyMe
				</Typography>
			</Grid>
			{/* Sign in area (right)*/}
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
				sx={{
					backgroundColor: spotifyGreenDark,
					background: `linear-gradient(${spotifyGreenDark}, #000)`,
					boxShadow: "0px 0px 10px #000",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<ICard
					nohome="true"
					style={{
						width: "75%",
					}}
					cstyle={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "speace-evenly",
						flexWrap: "wrap",
						flexShrink: "8",
					}}>
					<Icon
						className="item"
						icon="mdi:spotify"
						color={spotifyGreen}
						width="50px"
						height="50px"
					/>
					<Typography className="item" variant="h4">
						{Cookies.get("spotifyAuthToken")
							? "Return to Home Page"
							: "Sign in through Spotify®"}
					</Typography>
					<AuthorizeUser className="item" />
				</ICard>
			</Grid>
		</Grid>
	);
}
