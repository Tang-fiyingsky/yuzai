$ErrorActionPreference = "Continue"

$targets = @(
  @{ id = "hongyadong"; term = "Hongyadong Chongqing" },
  @{ id = "jiefangbei"; term = "Jiefangbei Chongqing" },
  @{ id = "liziba"; term = "Liziba station Chongqing" },
  @{ id = "qiansimen"; term = "Qiansimen Bridge Chongqing" },
  @{ id = "airport"; term = "Chongqing Jiangbei International Airport terminal" },
  @{ id = "elingpark"; term = "Eling Park Chongqing" },
  @{ id = "nanbinroad"; term = "Nanbin Road Chongqing" },
  @{ id = "cableway-south"; term = "Chongqing Yangtze River Cableway" },
  @{ id = "cableway-north"; term = "Chongqing Yangtze River Cableway" },
  @{ id = "longmenhao"; term = "Longmenhao Chongqing" },
  @{ id = "shibati"; term = "Shibati Chongqing" },
  @{ id = "guanyinqiao"; term = "Guanyinqiao Chongqing" },
  @{ id = "beicang"; term = "Beicang Chongqing" },
  @{ id = "taping"; term = "Taping Chongqing" },
  @{ id = "eling2"; term = "Eling Factory Chongqing" },
  @{ id = "xiahaoli"; term = "Xiahaoli Chongqing" }
)

$outDir = Join-Path (Get-Location) "public/images/attractions"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$report = @()

foreach ($target in $targets) {
  try {
    $encodedTerm = [uri]::EscapeDataString($target.term)
    $uri = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=$encodedTerm&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=1200&format=json"
    Start-Sleep -Milliseconds 700
    $headers = @{ "User-Agent" = "ChongqingCoupleTrip/0.1 (local travel guide image credit check)" }
    $result = Invoke-RestMethod -Uri $uri -TimeoutSec 30 -Headers $headers
    $pages = @($result.query.pages.PSObject.Properties.Value) | Sort-Object index
    $page = $pages | Where-Object { $_.imageinfo -and ($_.imageinfo[0].thumburl -or $_.imageinfo[0].url) } | Select-Object -First 1
    if (-not $page) {
      $report += [pscustomobject]@{ id = $target.id; term = $target.term; status = "missing" }
      continue
    }
    $info = $page.imageinfo[0]
    $imageUrl = if ($info.thumburl) { $info.thumburl } else { $info.url }
    $ext = if ($imageUrl -match "\.png") { "png" } else { "jpg" }
    $file = Join-Path $outDir "$($target.id).$ext"
    Invoke-WebRequest -Uri $imageUrl -OutFile $file -TimeoutSec 60 -Headers $headers
    $artist = $info.extmetadata.Artist.value -replace "<[^>]+>", ""
    $license = $info.extmetadata.LicenseShortName.value -replace "<[^>]+>", ""
    $report += [pscustomobject]@{
      attractionId = $target.id
      localPath = "/images/attractions/$($target.id).$ext"
      sourceName = "Wikimedia Commons"
      sourceUrl = $info.descriptionurl
      title = $page.title
      author = $artist
      license = $license
      checkedAt = "2026-07-12"
      status = "confirmed"
      bytes = (Get-Item $file).Length
    }
  } catch {
    $report += [pscustomobject]@{ id = $target.id; term = $target.term; status = "error"; error = $_.Exception.Message }
  }
}

$report | ConvertTo-Json -Depth 8 | Set-Content -Encoding UTF8 image-fetch-report.json
$report | Format-Table -AutoSize
