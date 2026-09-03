#!/usr/bin/env bash
set -euo pipefail

URL="https://silaspignotti.dev"

# ── helper ────────────────────────────────────────────────────────────
probe_route() {
  local label="$1"
  local path="$2"
  local full="${URL}${path}"

  local code time_s
  code=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$full" 2>/dev/null || echo "000")
  time_s=$(/usr/bin/curl -s -o /dev/null -w "%{time_total}" --max-time 10 "$full" 2>/dev/null || echo "0")

  local ms
  ms=$(printf '%s' "$time_s" | /usr/bin/awk '{printf "%d", $1 * 1000}')

  if [[ "$code" == "200" ]] && [[ "$ms" -lt 2000 ]]; then
    printf "%s\tok\t%ss\tHTTP %s\n" "$label" "$time_s" "$code"
  elif [[ "$code" == "200" ]]; then
    printf "%s\twarn\t%ss\tslow response\n" "$label" "$time_s"
  else
    printf "%s\tfail\t-\tHTTP %s\n" "$label" "$code"
  fi
}

# ── probes ────────────────────────────────────────────────────────────
probe_route "Homepage" "/"
probe_route "About"    "/about/"
probe_route "Projects" "/projects/"
