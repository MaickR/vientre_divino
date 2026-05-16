Add-Type -AssemblyName System.Web
$files = @("index.html", "index-en.html")
$report = "Audit Results - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n`n"
$allOk = $true

foreach ($file in $files) {
    if (-not (Test-Path $file)) { 
        $report += "--- $file NOT FOUND ---`n"
        $allOk = $false
        continue 
    }
    $report += "--- Audit for $file ---`n"
    $content = Get-Content $file -Raw
    $lines = Get-Content $file
    
    $ids = [regex]::Matches($content, 'id="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    
    $hrefMatches = [regex]::Matches($content, 'href="([^"]+)"')
    foreach ($match in $hrefMatches) {
        $href = $match.Groups[1].Value
        $foundLine = -1
        for ($i=0; $i -lt $lines.Length; $i++) {
            if ($lines[$i].Contains($match.Value)) { $foundLine = $i + 1; break }
        }
        
        if ($href.StartsWith("#") -and $href.Length -gt 1) {
            $targetId = $href.Substring(1)
            if ($ids -notcontains $targetId) {
                $report += "Error: Broken internal link '$href' at line $foundLine`n"
                $allOk = $false
            }
        } elseif ($href -like "*wa.me*") {
            $text = "MISSING text param"
            if ($href -match "text=([^&]+)") { 
                try {
                    $decoded = [System.Web.HttpUtility]::UrlDecode($matches[1])
                    $text = $decoded.Split(".!?[`n")[0].Trim()
                } catch { $text = "Decode Error" }
            } else {
                $allOk = $false
            }
            $report += "WhatsApp at line $foundLine`: $text`n"
        } elseif ($href -notmatch "^(http|mailto|tel|#|javascript)" -and $href.Trim() -ne "") {
            $cleanPath = $href.Split('#')[0].Split('?')[0]
            if (-not (Test-Path $cleanPath)) {
                $report += "Error: Local file not found '$href' at line $foundLine`n"
                $allOk = $false
            }
        }
    }
    $report += "`n"
}

if ($allOk) { $report += "FINAL STATUS: ALL OK`n" } 
else { $report += "FINAL STATUS: ERRORS FOUND`n" }

$report | Out-File -FilePath "audit_results.txt" -Encoding utf8
Write-Host $report
