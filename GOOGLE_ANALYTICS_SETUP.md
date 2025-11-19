# Google Analytics Setup Guide

## Step 1: Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in the bottom left)
3. Click **Create Property**
4. Fill in your property details:
   - Property name: "Flappy Bird Mod"
   - Time zone: Your time zone
   - Currency: Your currency
5. Click **Next** and fill in business details
6. Click **Create** and accept the terms

## Step 2: Create a Web Data Stream

1. In the property setup, click **Web** under "Choose a platform"
2. Enter your website URL (or use localhost for testing)
3. Enter a stream name: "Flappy Bird Web"
4. Click **Create stream**
5. You'll see your **Measurement ID** (format: G-XXXXXXXXXX)

## Step 3: Add Your Measurement ID to the Code

Replace `YOUR_MEASUREMENT_ID` in these files with your actual Measurement ID:

### File 1: `index.html`

```html
<!-- Replace YOUR_MEASUREMENT_ID with your actual ID -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX", {
    send_page_view: true,
  });
</script>
```

### File 2: `src/utils/analytics.ts`

```typescript
// Replace YOUR_MEASUREMENT_ID with your actual ID
const MEASUREMENT_ID = "G-XXXXXXXXXX";
```

## Step 4: Test Your Setup

1. Run your app: `npm run dev`
2. Open your browser's developer console
3. Look for Google Analytics debug messages
4. Go to Google Analytics > Reports > Realtime to see live traffic

## Step 5: View Your Analytics Data

After collecting data, you can view:

### Geographic Data (City-wise)

1. Go to **Reports** > **User** > **User attributes** > **Demographics details**
2. Or go to **Reports** > **Life cycle** > **Acquisition** > **Traffic acquisition**
3. Add secondary dimension: **City** or **Country**

### Session Duration

1. Go to **Reports** > **Engagement** > **Events**
2. Look for the `session_duration` event
3. You can see average time users spend playing

### Custom Game Metrics

The following events are tracked:

- **game_start**: When a user starts playing
- **game_end**: When the game ends (includes score)
- **session_duration**: How long each game session lasted (in seconds)
- **milestone_reached**: When users reach score milestones
- **high_score**: New personal high scores

## Step 6: Create Custom Reports (Optional)

### Average Play Time Report

1. Go to **Explore** in the left sidebar
2. Create a new exploration
3. Add metrics:
   - Event count for `session_duration`
   - Average value
4. Add dimensions: City, Date, Device category

### Geographic Player Distribution

1. Create a new exploration
2. Choose **Geo map** visualization
3. Add metrics: Active users, Events
4. Add dimension: City or Country

## Important Notes

- **Data appears after 24-48 hours** for most reports
- **Realtime reports** show data immediately (last 30 minutes)
- Remove `debug_mode: true` from `analytics.ts` before deploying to production
- Consider user privacy and add a cookie consent banner if required by your region

## Privacy Considerations

For compliance with GDPR and other privacy laws, consider:

1. Adding a privacy policy
2. Implementing a cookie consent banner
3. Anonymizing IP addresses (GA4 does this by default)
4. Allowing users to opt-out of tracking

## Testing Checklist

- [ ] Measurement ID added to both files
- [ ] Page view tracked on load
- [ ] Game start event fires
- [ ] Game end event fires with score and duration
- [ ] Milestone events fire at correct scores
- [ ] High score event fires when beaten
- [ ] Data visible in GA4 Realtime reports
