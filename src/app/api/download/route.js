// app/api/download/route.js

import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url || !ytdl.validateURL(url)) {
    return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

    const videoStream = ytdl(url, { format });
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    headers.set('Content-Type', 'video/mp4');

    return new NextResponse(videoStream, { headers });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
