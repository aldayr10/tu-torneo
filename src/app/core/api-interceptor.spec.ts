import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from './api-config';
import { apiInterceptor } from './api-interceptor';

const base = 'http://localhost:3000';

describe('apiInterceptor', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    sessionStorage.removeItem('access_token');
    TestBed.configureTestingModule({ providers: [
      provideHttpClient(withInterceptors([apiInterceptor])),
      provideHttpClientTesting(),
      { provide: API_BASE_URL, useValue: base },
    ] });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    sessionStorage.removeItem('access_token');
  });

  it('attaches a stored Bearer token only to the configured API', () => {
    sessionStorage.setItem('access_token', 'test-token');
    const client = TestBed.inject(HttpClient);
    const urls = [
      `${base}/team`,
      'https://external.invalid/api/v1/teams',
      `${base}-other/team`,
      '/team',
    ];

    for (const url of urls) {
      client.get(url).subscribe();
      const request = http.expectOne(url);
      expect(request.request.headers.get('Authorization'))
        .toBe(url === `${base}/team` ? 'Bearer test-token' : null);
      request.flush({});
    }
  });

  it('leaves API requests unauthenticated when no token is stored', () => {
    TestBed.inject(HttpClient).get(`${base}/team`).subscribe();
    const request = http.expectOne(`${base}/team`);
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });
});
