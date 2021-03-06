import React from 'react';
import { Feed, Header, Icon, Label } from 'semantic-ui-react';

import './SocialFeed.scss';
import { Loader, NotFound } from '..';
import { IsNullOrUndefined } from '../../util/common';

function SocialFeed(props) {
  const { tweets } = props;
  if (IsNullOrUndefined(tweets)) {
    return (<Loader></Loader>);
  }
  return (
    <div className="news-container">
      <Header as='h3'>Feed</Header>
      <Feed>
        {tweets.length === 0 && <NotFound />}
        {tweets.map((tweet) => {
          return (
            <Feed.Event key={tweet.id}>
              <Feed.Label>
                <Icon name="twitter"></Icon>
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User href={tweet.url} target="_blank">{tweet.user.name} (@{tweet.user.screenName})</Feed.User>
                  <Feed.Date>{tweet.createdAt}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra>
                  {tweet.text}
                </Feed.Extra>
                <Feed.Meta>
                  {tweet.entities.map((hashtag) => {
                    return (
                      <Label key={`${tweet.user.id}${hashtag.text}`}>
                        {hashtag.text}
                      </Label>
                    );
                  })}
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>);
        })}
      </Feed>
    </div>);

}

export default SocialFeed;