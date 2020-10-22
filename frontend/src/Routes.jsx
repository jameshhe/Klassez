import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './AppliedRoute';
import { ProfileView, ProfileEditor, LikesView, SavedView, RecipeView, RecipeEditor } from './Profile';
import { loginLanding } from './Login'
import { ProductView, ProductEditor } from './Products';
import { landingPage, about, gettingStarted, backgroundPage, Foods } from './LandingPage';
import { AdvancedSearch } from './Search'

export default function Routes({ appProps }) {
    return (
      <Switch>
        <AppliedRoute path="/" exact component={landingPage} appProps={appProps} />
        <AppliedRoute path="/about" exact component={about} appProps={appProps} />
        <AppliedRoute path="/foodsNew" exact component={Foods} appProps={appProps} />
        <AppliedRoute path="/gettingStarted" exact component={gettingStarted} appProps={appProps} />
        <AppliedRoute path="/backgroundPage" exact component={backgroundPage} appProps={appProps} />
        <AppliedRoute path="/login" exact component={loginLanding} appProps={appProps} />
        <AppliedRoute path="/search" exact component={AdvancedSearch} appProps={appProps} />
        <AppliedRoute path="/:username" exact component={ProfileView} appProps={appProps} />
        <AppliedRoute path="/:username/likes" exact component={LikesView} appProps={appProps} />
        <AppliedRoute path="/:username/saved" exact component={SavedView} appProps={appProps} />
        <AppliedRoute path="/:username/edit" exact component={ProfileEditor} appProps={appProps} />
        <AppliedRoute path="/:username/recipes" exact component={RecipeView} appProps={appProps} />
        <AppliedRoute path="/:username/recipes/:recipeName" exact component={RecipeEditor} appProps={appProps} />
        <AppliedRoute path="/product/:name" exact component={ProductView} appProps={appProps} />
        <AppliedRoute path="/product/:name/edit" exact component={ProductEditor} appProps={appProps} />
        
        { /* Add catch for routes not found */ }
        {/* <Route component={NotFound} /> */}
      </Switch>
    );
}
