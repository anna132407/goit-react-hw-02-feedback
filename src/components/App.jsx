import React, { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Feedback } from './Feedback/Feedback';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

      countTotalFeedback = () => {
    let total = this.state.good + this.state.neutral + this.state.bad;
    return total;
  };

  countPositiveFeedbackPercentage = () => {
    let positiveFeedback = Math.floor(
      (this.state.good / this.countTotalFeedback()) * 100
    );
    return positiveFeedback;
  };

  onLeaveFeedback = option => {
    console.log(option);

    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    return (
      <div>
        <Section title="Please leave feedback">
          <Feedback
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        {total > 0 ? (
          <Section title="Statistics:">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              onCountPositiveFeedbackPercentage={
                this.countPositiveFeedbackPercentage
              }
            />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </div>
    );
  }
}